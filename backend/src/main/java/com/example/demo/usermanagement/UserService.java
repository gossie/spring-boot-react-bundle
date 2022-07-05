package com.example.demo.usermanagement;

import com.example.demo.model.user.OutOfBrainUser;
import com.example.demo.model.user.UserCreationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService  implements UserDetailsService {
    private final UserMongoRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public OutOfBrainUser createUser(UserCreationDTO userCreationDTO) {
        if(userCreationDTO.getUsername()==null || userCreationDTO.getUsername().isBlank()){
            throw new IllegalArgumentException("username is blank");
        }
        if(!Objects.equals(userCreationDTO.getPassword(),userCreationDTO.getPasswordAgain())){
            throw new IllegalArgumentException("passwords do not match");
        }
        OutOfBrainUser user = new OutOfBrainUser();
        user.setUsername(userCreationDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userCreationDTO.getPassword()));

        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return findByUsername(username)
                .map(user->new User(user.getUsername(), user.getPassword(), List.of()))
                .orElseThrow(()->new UsernameNotFoundException(username + " not found"));
    }

    public Optional<OutOfBrainUser> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
