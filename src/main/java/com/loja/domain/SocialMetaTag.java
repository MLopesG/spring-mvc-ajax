package com.loja.domain;

import java.io.Serializable;

@SuppressWarnings("Serial")
public class SocialMetaTag implements Serializable{

    /**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private String site;
    private String title;
    private String url;
    private String image;

    public String getSite() {
        return this.site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }    
}