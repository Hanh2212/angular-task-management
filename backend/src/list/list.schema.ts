import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ListDocument = ListTask & Document;

@Schema()
export class ListTask {
    @Prop()
    id: string;

    @Prop({required: true})
    title: string;
}

export const ListSchema = SchemaFactory.createForClass(ListTask);