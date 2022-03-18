import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop({required: true}) _listId: mongoose.Schema.Types.ObjectId;
    @Prop({required: true, minLength: 4, trim: true}) title: string;
    @Prop({minLength: 5, trim: true}) description: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);