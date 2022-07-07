package com.example.demo.security.oauth;

import com.example.demo.model.security.LoginResponse;
import com.example.demo.model.user.OutOfBrainUser;
import com.example.demo.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
public class OauthController {
    private final OauthService oauthService;
    private final JwtService jwtService;

    @GetMapping
    public ResponseEntity<LoginResponse> githubOauthFlow(@RequestParam String code) {
        OutOfBrainUser user;
        try {
            user = oauthService.githubOauthFlow(code);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", user.getRoles());
        return ResponseEntity.ok(new LoginResponse(jwtService.createJwt(claims, user.getUsername())));
    }
}
