export class Post {
    public id: number;
    public group_id: number;
    public user_id: number;
    public photo: any;
    public description: string;

    constructor(data: Post | undefined) {
        if(data === undefined) {
            this.id = 0;
            this.group_id = 0;
            this.user_id = 0;
            this.photo = '';
            this.description = '';
        } else {
            this.id = data.id;
            this.group_id = data.group_id;
            this.user_id = data.user_id;
            this.photo = data.photo;
            this.description = data.description;
        }
    }
}