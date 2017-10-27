"use strict";
var lang_1 = require("./lang");
//Methods For the Validations
//Minimum Length Validator
function minLenValidator(minvalue, value) {
    return minvalue <= value ? true : false;
}
exports.minLenValidator = minLenValidator;
//Maximum Length Validator
function maxlenValidator(maxvalue, value) {
    return maxvalue >= value ? true : false;
}
exports.maxlenValidator = maxlenValidator;
//All Patterns
function regExpValidator(pattern, value) {
    var rules = {
        'zh-CN': /^(\+?0?86\-?)?((13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/,
        'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
        // Accepts only +ve numeric values
        //'en-HK': /^\d*\.?\d+$/,
        //1. this is allow only 10 number only  not allow   any alphabets and special characters 
        'numeric_10': /^[0-9]{10}$/,
        // 2.  this is allow only  [A-z]  capital and small [A-Z] it not allow the  numbers and specials characters
        'alphabets_10': /^[A-z]{10}$/,
        // 3.this is only allow the alphabets and numbers. 
        'alpha_numerics_nospace': /^[a-zA-Z0-9]+$/,
        // 4.this only allow the dateformat
        'dateformat': /^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/,
        // 5.alphabets(a-z),(A-Z),numbers(0-9),the underscore(_),dot(.)  and not accept spaces(other)
        'alpha_numeric_dot_underscore_nospace': /^[a-zA-Z0-9_.]+$/,
        //  6.alphabets( A-Z,a-z),Numbers(0-9) and #
        'alpha_numeric_hash_space': /^[a-zA-Z0-9,#]+$/,
        // 7. letters(a-z),numbers  (0-9),the underscore(_) and not accept spaces
        'alpha_numeric_underscore_nospace': /^[a-zA-Z0-9,_]+$/,
        //  8.letters(A-Z,a-z) and no spaces
        'alpha_nospace': /^[a-zA-Z,]+$/,
        // 9. IX)Letters(a-z))  and spaces
        'alpha_space': /^[a-zA-Z]+$/,
        // 10. this only numbers
        'numeric': /^[0-9]*$/,
        //  11.  accepts everything except for < or > it accept   all 
        'except_less_greater_symbols': /^[\a-zA-Z0-9_@!~`'}{"?^`)(*.;:, -/+=|&#$/\\]+$/,
        // 12. Use only letters (a-z), numbers (0-9), special characters (_, -, /) and not accept spaces
        'alpha_numeric_underscore_hyphen_backslash_nospace': /^[a-zA-Z0-9_,-/]+$/,
        //13. Use only letters(a-z),(A-Z),numbers (0-9),the underscore(_), dot (.), special characters (_, -, /,\) and not  accept space
        'alpha_numeric_underscore_dot_forward_backward_nospace': /^[a-zA-Z0-9_.,-/\\]+$/,
        // 14. Use only letters (A-Z) and no spaces
        'alphabets_nospace': /^[a-zA-Z]*$/,
        // 15. Use only letters (a-z), numbers (0-9), the underscore(_), &, - and  accept spaces
        'alpha_numeric_underscore_ampersand_hyphen_spaces': /^[a-zA-Z0-9,&, ,_-]+$/,
        // 16. Use only numbers (0-9) and .(dot) || phones['en-US']
        'numeric_dot': /^[0-9.]+$/,
        // 17. Allows Everything
        'everything': /^[\a-zA-Z0-9_@!~`'}{"?^`<>)(*.;:, -/+=|&#$/\\]+$/,
        // 18. Allows alphabets,numerics,spaces
        'alpha_numeric_space': /^[a-zA-Z0-9]*$/
    };
    var Exppattern = rules[pattern];
    return (new RegExp(Exppattern)).test(value) ? true : false;
}
exports.regExpValidator = regExpValidator;
//Alpha Numeric Validator
function AlphaNumeric(value) {
    var AlphaNumericPattern = /^[a-zA-Z0-9\s]*$/;
    return (new RegExp(AlphaNumericPattern)).test(value) ? true : false;
    //a-zA-Z0-9 - any alphanumeric characters
    //\s - any space characters (space/tab/ etc.)          
    //$ - end of the string
}
exports.AlphaNumeric = AlphaNumeric;
//Email Validator
function Email(value) {
    var EmailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (new RegExp(EmailPattern)).test(value) ? true : false;
}
exports.Email = Email;
//Phone validation
function Phone(value) {
    var PhonePattern = /^[0-9]{10}$/;
    return (new RegExp(PhonePattern)).test(value) ? true : false;
}
exports.Phone = Phone;
function Fax(value) {
    var FaxPattern = /^[0-9]{10}$/;
    return (new RegExp(FaxPattern)).test(value) ? true : false;
}
exports.Fax = Fax;
//Zip Validation
function ZipCode(value) {
    //http://networking.mydesigntool.com/viewtopic.php?tid=308&id=31
    //var zippattern = /^([0-9]){5}(([]|[-])?([0-9]){4})?$/;
    var zippattern = /\d{5}((-)?\d{4})?|([A-Za-z]\d[A-Za-z]( )?\d[A-Za-z]\d)/;
    //var zippattern = /^[0-9]{10}$/;
    return (new RegExp(zippattern)).test(value) ? true : false;
}
exports.ZipCode = ZipCode;
//Range Validator
function RangeLengthValidator(range, value) {
    return value.length >= range[0] && value.length <= range[1] ? true : false;
}
exports.RangeLengthValidator = RangeLengthValidator;
//Validator that requires controls to have a value of digits.
function DigitsValidator(value) {
    var DigitsPattern = /^\d+$/;
    return (new RegExp(DigitsPattern)).test(value) ? true : false;
}
exports.DigitsValidator = DigitsValidator;
//Validator that requires controls to have a value of number.
function NumberValidator(value) {
    var NumberPattern = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
    return (new RegExp(NumberPattern)).test(value) ? true : false;
}
exports.NumberValidator = NumberValidator;
//Validator that requires controls to have a value of url.
function UrlValidator(value) {
    var UrlPattern = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return (new RegExp(UrlPattern)).test(value) ? true : false;
}
exports.UrlValidator = UrlValidator;
//Date validator
function DateValidator(value) {
    var datepattern = /Invalid|NaN/;
    return !(new RegExp(datepattern)).test(new Date(value).toString()) ? true : false;
}
exports.DateValidator = DateValidator;
//Validator that requires controls to have a value of minDate.
function MinDateValidator(minDate, value) {
    if (!lang_1.isDate(minDate) && !(minDate instanceof Function))
        throw Error('minDate value must be a formatted date');
    if (!lang_1.isDate(value))
        return { minDate: true };
    if (minDate instanceof Function)
        minDate = minDate();
    return value >= new Date(minDate) ? true : false;
}
exports.MinDateValidator = MinDateValidator;
//Validator that requires controls to have a value of maxDate.
function MaxDateValidator(maxDate, value) {
    if (!lang_1.isDate(maxDate))
        throw Error('maxDate value must be a formatted date');
    if (!lang_1.isDate(value))
        return { maxDate: true };
    if (maxDate instanceof Function)
        maxDate = maxDate();
    return value <= new Date(maxDate) ? true : false;
}
exports.MaxDateValidator = MaxDateValidator;
//Equal Validator
function EqualValidator(eqval, value) {
    return eqval === value ? true : false;
}
exports.EqualValidator = EqualValidator;
//# sourceMappingURL=Validators.js.map