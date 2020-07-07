class EmbedBuilder {

    constructor() {
        this.data = {
            "embeds": [{ "fields": [] }]
        };
    }


    getJSON() {
        return this.data;
    }

  
    setText(text){
        this.data.content = text;

        return this;
    }

    setDescription(description) {
        this.data.embeds[0].description = description.toString().substring(0, 2048);
        return this;
    }

    setAvatar(avatarURL) {
        this.data.icon_url = avatarURL;
        return this;
    }

    setFooter(footer, footerIcon) {
        this.data.embeds[0].footer = footer;

        if (footerIcon) {
            this.data.embeds[0].footer_icon = footerIcon;
        }
        return this;
    }

    setTitle(title) {
        this.data.embeds[0].title = title;
        return this;
    }

    setColor(color) {
        if (isNaN(color)) {
            if (color.charAt(0) !== "#") throw new Error("Invalid color");
            color = color.replace('#', '');
            if (isNaN(color)) throw new Error("Invalid color");
            color = parseInt(color, 16);
        }
       else if (color < 0 || color > 0xFFFFFF)
            throw new Error("Color must be between 0 and 16777215 (0xFFFFFF)");
        this.data.embeds[0].color = color;
        return this;
    }
    
    setText(text) {
        this.data.text = text;
        return this;
    }

    setURL(url) {
        this.data.embds[0].title_link = url;
        return this;
    }
    
    setAuthor(author, iconURL, url) {
        this.data.embeds[0].author_name = author;

        if (iconURL) {
            this.data.embeds[0].author_icon = iconURL;
        }

        if (url) {
            this.data.embeds[0].author_link = url;
        }

        return this;
    }

    addField(title, value, inline) {
        if (!inline) {
            inline = false;
        }

        const fieldObj = {
            "title": title,
            "value": value,
            "short": inline
        };

        this.data.embeds[0].fields.push(fieldObj);
        return this;
    }

    removeField(name) {
        this.data.embeds[0].fields = this.data.embeds[0].fields.filter(field => field.title != name);

        return this;
    }

    setTimestamp(timestamp) {
        if (!timestamp) timestamp = new Date();

        this.data.embeds[0].timestamp = timestamp;
        return this;
    }

    setImage(imageURL) {
        if (!imageURL) {
            process.emitWarning("Image passed was null, nothing will be displayed in Discord");
        }
        this.data.embeds[0].image_url = imageURL;
        return this;
    }

    setThumbnail(thumbnailURL) {
        if (!thumbnailURL) {
            process.emitWarning("thumbnail passed was null, nothing will be displayed in Discord");
        }
        this.data.embeds[0].thumb_url = thumbnailURL;
        return this;
    }
}

module.exports = EmbedBuilder;
