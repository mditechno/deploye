import { Article } from './Article';
export class Cart {

    userId : string;
    articles : Article[];

    constructor(userId : string, articles : Article[]) {
        this.userId = userId;
        this.articles = (articles.length > 0) ? articles : [];
    }
}