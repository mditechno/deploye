export class Article {

    name : string;
    description : string;
    conditionnement : string;
    quantity : number;
    image : string;
    inCart : boolean;

    constructor(name : string, conditionnement : string, inCart : boolean) {
        this.name = name;
        this.conditionnement = conditionnement;
        this.inCart = (inCart != null) ? inCart : false;
    }
}