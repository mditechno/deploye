import { Article } from './Article';
export class Category {

    name : string;
    articles : Article[];

    constructor(name : string, articles : Article[]) {
        this.name = name;
        this.articles = articles;
    }
}