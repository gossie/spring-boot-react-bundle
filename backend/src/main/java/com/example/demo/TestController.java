package com.example.demo;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private List<String> greetings = Arrays.asList("Hallo", "Moin", "Servus");

    @GetMapping(path="/api/greeting", produces="text/plain")
    public String hello() {
        Random rand = new Random();
        return greetings.get(rand.nextInt(greetings.size()));
    }

}