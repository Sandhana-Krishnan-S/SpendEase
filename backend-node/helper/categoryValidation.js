const emojiRegex = require('emoji-regex')();

const categoryNameValidate = (categoryName) => {
    if(typeof categoryName !== 'string' || categoryName.length < 3) {
        return {
            status : false,
            data : null,
            error : 'Category name is invalid'
        };
    }
    return {
        status : true,
        data : categoryName,
        error : null
    };
}

const categoryEmojiValidate = (categoryEmoji) => {
    const matches = categoryEmoji.match(emojiRegex);
    console.log(matches.length !== 1)
    if(!matches || matches.length !== 1 || matches[0] !== categoryEmoji) {
        return {
            status : false,
            data : null,
            error : 'Category emoji is invalid'
        };
    }
    console.log('test')
    return {
        status : true,
        data : categoryEmoji,
        error : null
    };
}

module.exports = {
    categoryNameValidate,
    categoryEmojiValidate
};