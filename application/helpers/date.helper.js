class DateHelper {
    constructor(){
        if(! DateHelper.instance){
            DateHelper.instance = this;
        }
        return DateHelper.instance;
    }
    //TODO: format is not used ATM, need to implement support for different formats
    getFormattedDate(format = "MM/DD/YY HH:mm:ss", date = null) {
        if(!date) {
            date = new Date();
        }
        return [
            [
                (date.getMonth()+1).toString().padStart(2, "0"),
                date.getDate().toString().padStart(2, "0"),
                date.getFullYear()
            ].join('/'),
            [
                date.getHours().toString().padStart(2, "0"),
                date.getMinutes().toString().padStart(2, "0"),
                date.getSeconds().toString().padStart(2, "0"),
            ].join(':')
        ].join(' ');
    }

}
const instance = new DateHelper();
Object.freeze(instance);

module.exports = instance;
