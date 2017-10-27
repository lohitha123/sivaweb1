"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        'alpha_numeric_hash_space': /^[a-zA-Z0-9 #]+$/,
        // 7. letters(a-z),numbers  (0-9),the underscore(_) and not accept spaces
        'alpha_numeric_underscore_nospace': /^[a-zA-Z0-9_]+$/,
        //  8.letters(A-Z,a-z) and no spaces
        'alpha_nospace': /^[a-zA-Z]+$/,
        // 9. IX)Letters(a-z))  and spaces
        'alpha_space': /^[a-zA-Z ]+$/,
        // 10. this only numbers
        'numeric': /^[0-9]*$/,
        //  11.  accepts everything except for < or > it accept   all 
        'except_less_greater_symbols': /^[^<> ]+(\s{0,1}[^<>])*$/,
        // 12. Use only letters (a-z), numbers (0-9), special characters (_, -, /) and not accept spaces
        'alpha_numeric_underscore_hyphen_backslash_nospace': /^[a-zA-Z0-9-_/]+$/,
        //13. Use only letters(a-z),(A-Z),numbers (0-9),the underscore(_), dot (.), special characters (_, -, /,\) and not  accept space
        'alpha_numeric_underscore_dot_forward_backward_nospace': /^[a-zA-Z0-9_./\\]+$/,
        // 14. Use only letters (a-z/A-Z) and no spaces
        'alphabets_nospace': /^[a-zA-Z]*$/,
        // 15. Use only letters (a-z), numbers (0-9), the underscore(_), &, - and  accept spaces
        'alpha_numeric_underscore_ampersand_hyphen_spaces': /^[a-zA-Z0-9& _-]+$/,
        // 16. Use only numbers (0-9) and .(dot) || phones['en-US']
        'numeric_dot': /^\d+(?:\.\d*)?$/,
        // 17. Allows Everything
        'everything': /^[\a-zA-Z0-9_@!~`'%}{"?^`<>)(*.;:, -/+=|&#$/\\]+$/,
        // 18. Allows alphabets,numerics,spaces
        'alpha_numeric_space': /^[a-zA-Z0-9 ]*$/,
        // 19. Allows alphabets,numerics,dot
        'alpha_numeric_dot_nospace': /^[a-zA-Z0-9.]*$/,
        //20. Allows alphabets,numerics,dot,backslash,underscore,hyphen
        'alpha_numeric_dot_backslash_underscore_hyphen_nospace': /^[a-zA-Z0-9./_-]*$/,
        //21. Allows alphabets,numerics,dot,hyphen
        'alpha_numeric_dot_hyphen_nospace': /^[a-zA-Z0-9.-]*$/,
        //22. Allows alphabets,numerics,dot,underscore,hyphen
        'alpha_numeric_dot_underscore_hyphen_nospace': /^[a-zA-Z0-9._-]*$/,
        //23. numeric_colon
        'numeric_colon': /^[0-9:]+$/,
        //24. Alphabets[A-z] AND numbers [1-5]
        'alpha-numeric(1-5)': /^[A-Z1-5]*$/,
        //25.  Alphabets[A-z] , numbers [1-5], underscore and space
        'alpha_numeric_underscore_space': /^[a-zA-Z0-9 _]+$/,
        //26.  Alphabets[A-z] , numbers [0-9], hash and no space
        'alpha_numeric_hash_nospace': /^[a-zA-Z0-9#]+$/,
        //27. except special characters .,;/\[]_'
        'except_.,;/\[]__symbols': /^[^.'_,\[\];/\\]*$/,
        //28. alpha_numeric_Underscore with +,-,=
        'alpha_numeric_underscore_+=-_symbols': /^[a-zA-Z0-9/_+=-]+$/,
        //29.alpha-numeric with underscore,backslash,hyphen
        'alpha_numeric_underscore_hyphen_backslash_space': /^[a-zA-Z0-9/ _-]+$/,
        //30.enter characters or numbers with space
        'alpha_numeric': /^[a-zA-Z0-9_\\s/-]+$/,
        //31.enter characters or numbers with special characters
        'alpha_numeric_specialcharacters': /^[a-zA-Z0-9_\\s*#&()-/:']+$/,
        //32.enter characters or numbers with space
        'alpha_numeric_underscore_hyphen_nospace': /^[a-zA-Z0-9_-]*$/,
        //33.alphabets(a-z),(A-Z),numbers(0-9),the underscore(_)  and not accept spaces(other)
        'alpha_numeric_underscore_hyphen_notspace': /^[a-zA-Z0-9_-]+$/,
        //34.Allows alphabets,numerics,special characters(,)
        'alpha_numeric_specialchar': /^[a-zA-Z0-9,]*$/,
        //35.Allows alphabets,the underscore(_) and hyphen
        'alpha_underscore_hyphen': /^[a-zA-Z_-]+$/,
        //36.Allows numerics,a double precision value
        'numerics_doubleprecision': /^[0-9]\d*(\.\d+)?$/,
        //37.Allows valid email pattern
        'email_pattern': /^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$/,
        //38.Allows alphabets(N,C,n,c) numbers and .
        "nc_numeric_dot": /^[NnCc0-9.]*$/,
        //39.alphabets(a-z),(A-Z),numbers(0-9),the underscore(_)  and with accept spaces
        'alpha_numeric_underscore_hyphen_withspace': /^[a-zA-Z0-9 _-]+$/,
        //40.alphabets(a-z),(A-Z),numbers(0-9),the underscore(_) ,comma(,),(_),(.),(space_),(') and with accept spaces
        'alpha_numeric_underscore_hyphen_dot_comma_squote_withspace': /^[a-zA-Z0-9- _.,']+$/,
        //41.Only Capitals Letters with no spaces
        'caps_alpha_nospace': /^[A-Z]+$/,
        //42 alphabets(a-z),(A-Z),numbers(0-9),Space,backslash and dots
        'alpha_numeric_hyphen_underscore_dot_tilde_verticalBar': /^[a-zA-Z0-9-_.~|]+$/,
        //43 alphabets(a-z),(A-Z),numbers(0-9),Space,backslash and dots
        'alpha_numeric_space_dot_backslash': /^[a-zA-Z0-9/. ]*$/,
        //44 alphabets(a-z),(A-Z),numbers(0-9),Space,backslash and dots
        'alpha_numeric_dot_underscore_hyphen_space': /^[a-zA-Z0-9._ -]*$/,
        //45 alphabets(a-z),(A-Z),numbers(0-9),Space,backslash and dots
        'alpha_numeric_except_fst_space': /^[a-zA-Z0-9]+(\s{0,1}[a-zA-Z0-9 ])*$/,
        //46 alphabets(a-z),(A-Z),numbers(0-9),Space,backslash and dots
        'everything_except_space_as_fstchar': /^[a-zA-Z0-9_@!~`'}{"?^`<>)\[\](*.;:%,-/+=|&#$/\\]+(\s{0,1}[a-zA-Z0-9_@!~`'}{"?^`<>)\[\](*.;:, -/%+=|&#$/\\])*$/,
        //47 alphabets(a-z),(A-Z),numbers(0-9),Space,backslash and dots
        'alpha_numeric_specialcharacters_WithSpace': /^[a-zA-Z0-9_\\s*#&()-/ :']+$/,
        //48 everything_except_spaceasfstchar_ampersand_singlequote
        'everything_except_spaceasfstchar_ampersand_singlequote': /^[^&' ]+(\s{0,1}[^&'])*$/,
        //49 alphabets(a-z),(A-Z),numbers(0-9),underscore,hyphen,dot,backward,forward slash
        'alpha_numeric_underscore_dot_hyphen_forward_backward_nospace': /^[a-zA-Z0-9-_./\\]+$/,
        'email': /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'numeric_dot_initial': /^\d*(?:\.\d*)?$/,
        'numeric_decimals': /^[-]?\d*\.?\d*$/,
        // 53. Allows Everything except space
        'everything_nospace': /^[\a-zA-Z0-9_@!~`'%}{"?^`<>)(*.;:,-/+=|&#$/\\]+$/,
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