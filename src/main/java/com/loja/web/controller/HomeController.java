package com.loja.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController{
    @GetMapping("/")
    public String init(){
        return "redirect:/promocao/add";
    }
}