import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ListDocument = ListTask & Document;

@Schema()
export class ListTask {
    @Prop({required: true, minLength: 4, trim: true}) title: string;
}

export const ListSchema = SchemaFactory.createForClass(ListTask);