import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Contact } from './entities/contact.entity';


@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}
  async create(createContactDto: CreateContactDto, userId: string) {
    const contact = Object.assign(new Contact(), createContactDto);
    const foundEmail = await this.prisma.contact.findFirst({
      where: { email: createContactDto.email },
    });
    if (foundEmail) {
      throw new ConflictException('email already exists');
    }

    const newContact = await this.prisma.contact.create({
      data: {
        id: contact.id,
        fullName: contact.fullName,
        email: contact.email,
        telephone: contact.telephone,
        createdAt: contact.createdAt,
        userId,
      },
    });
    return newContact;
  }

  async findAll() {
    return await this.prisma.contact.findMany();
  }

  async findOne(id: string) {
    const contact = await this.prisma.contact.findFirst({ where: { id } });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.prisma.contact.findFirst({ where: { id } });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    const updatedContact = await this.prisma.contact.update({
      where: { id },
      data: { ...updateContactDto },
    });
    return updatedContact;
  }

  async remove(id: string) {
    const contact = await this.prisma.contact.findFirst({ where: { id } });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    await this.prisma.contact.delete({ where: { id } });
  }
}
