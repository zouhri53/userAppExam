export class user 
{
    static id:number = 0;
    constructor (
        public nom:string,
        public prenom:string,
        public adresse:string,
        public cp:string,
        public ville:string,
        public fonction:string,
        public phone:string,
        public email:string,
        public id?:number)
    { 
       this.id = user.id++;
    }

}