package com.loja.web.controller;

import com.loja.domain.SocialMetaTag;
import com.loja.service.SocialMetaTagService;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@Controller
@RequestMapping("/meta")
public class SocialMetaTagController{

    @Autowired 
    private SocialMetaTagService service;

    @PostMapping("/info")
    public ResponseEntity<SocialMetaTag> getDadosiVia(@RequestParam("url") String url){
        SocialMetaTag socialMetaTag = service.getSocialMetaTagByUrl(url);
        return socialMetaTag != null ? ResponseEntity.ok(socialMetaTag) : ResponseEntity.notFound().build(); 
    }

}