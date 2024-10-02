export class StudentUpdate {
    id!: number;
    name!: string;
    address!: string;
    birthday: Date=new Date();
    gender!: string;


    get birthdayString(): string {
        return this.birthday ? this.birthday.toISOString().split('T')[0] : '';
    }

    set birthdayString(value: string) {
        this.birthday =  new Date(value) ; 
    }
}
