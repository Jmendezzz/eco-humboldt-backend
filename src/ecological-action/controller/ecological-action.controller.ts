import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { EcologicalActionService } from '../service/ecological-action.service';
import { CreateEcologicalActionRequestDto } from '../dto/create-ecological-action-request.dto';
import { UpdateEcologicalActionRequestDto } from '../dto/update-ecological-action-request.dto';
import { ECOLOGICAL_ACTION_API_ENTRY_POINT } from '../constant/ecological-action.constant';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller(ECOLOGICAL_ACTION_API_ENTRY_POINT.BASE)
export class EcologicalActionController {

  constructor(private readonly ecologicalActionService: EcologicalActionService) { }

  @UseGuards(JwtAuthGuard)
  @Post(ECOLOGICAL_ACTION_API_ENTRY_POINT.CREATE)
  async create(@Body() createEcologicalActionDto: CreateEcologicalActionRequestDto) {
    return this.ecologicalActionService.create(createEcologicalActionDto);
  }

  @Get(ECOLOGICAL_ACTION_API_ENTRY_POINT.GET_ALL)
  async findAll() {
    return this.ecologicalActionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(ECOLOGICAL_ACTION_API_ENTRY_POINT.GET_BY_ID)
  async findOne(@Param('id') id: string) {
    return this.ecologicalActionService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(ECOLOGICAL_ACTION_API_ENTRY_POINT.UPDATE)
  async update(@Param('id') id: string, @Body() updateEcologicalActionDto: UpdateEcologicalActionRequestDto) {
    return this.ecologicalActionService.update(+id, updateEcologicalActionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(ECOLOGICAL_ACTION_API_ENTRY_POINT.DELETE)
  async remove(@Param('id') id: string) {
    return this.ecologicalActionService.remove(+id);
  }
}
