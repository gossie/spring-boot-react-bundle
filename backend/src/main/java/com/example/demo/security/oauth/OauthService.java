package com.example.demo.security.oauth;

import com.example.demo.model.security.GithubAccessTokenResponse;
import com.example.demo.model.security.GithubUser;
import com.example.demo.model.user.OutOfBrainUser;
import com.example.demo.usermanagement.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class OauthService {
    private final RestTemplate template;
    private final UserService userService;
    @Value("${oauth.github.id}")
    private String githubClientId;
    @Value("${oauth.github.secret}")
    private String githubClientSecret;


    public OutOfBrainUser githubOauthFlow(String code) {
        String githubAuthorizationToken = getAuthorizationTokenFromGithub(code).getToken();

        GithubUser githubUser = getUserFromGithubAccessToken(githubAuthorizationToken);

        return userService.createOrGetUserFromMongoDB(githubUser);

    }

    private GithubAccessTokenResponse getAuthorizationTokenFromGithub(String code) {
        String url = "https://github.com/login/oauth/access_token?"
                + "client_id=" + githubClientId
                + "&client_secret=" + githubClientSecret
                + "&code=" + code;
        ResponseEntity<GithubAccessTokenResponse> request = template.postForEntity(url, null, GithubAccessTokenResponse.class);
        if(!request.getStatusCode().equals(HttpStatus.OK)){
            throw new RuntimeException("Request for authentication token to Github failed");
        }
        return request.getBody();
    }

    private GithubUser getUserFromGithubAccessToken(String githubAccessToken){
        ResponseEntity<GithubUser> gitHubUser = template.exchange(
                "https://api.github.com/user",
                HttpMethod.GET,
                new HttpEntity<>(
                        new HttpHeaders() {{
                    String authHeader = "Bearer " + githubAccessToken;
                    set( "Authorization", authHeader );
                }}),
                GithubUser.class
        );

        return gitHubUser.getBody();
    }


}
