package com.example.demo.security;

import com.example.demo.model.security.LoginData;
import com.example.demo.model.security.LoginResponse;
import com.example.demo.model.user.OutOfBrainUser;
import com.example.demo.usermanagement.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    public LoginResponse login(LoginData loginData) throws AuthenticationException {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginData.getUsername(), loginData.getPassword()));
        OutOfBrainUser user = userService.findByUsername(loginData.getUsername()).orElseThrow();
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", user.getRoles());
        return LoginResponse.builder().token(jwtService.createJwt(claims, loginData.getUsername())).build();
    }
}
