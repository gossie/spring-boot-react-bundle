package com.example.demo.usermanagement;

import com.example.demo.model.user.OutOfBrainUser;
import com.example.demo.model.user.UserCreationDTO;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

class UserServiceTest {

    @Test
    void shouldCreateNewUser() {
        // given
        UserCreationDTO userCreationDTO = new UserCreationDTO("testUser", "password", "password");
        UserMongoRepository userRepository = Mockito.mock(UserMongoRepository.class);
        PasswordEncoder passwordEncoder = Mockito.mock(PasswordEncoder.class);
        Mockito.when(passwordEncoder.encode("password")).thenReturn("hashedPassword");
        UserService userService = new UserService(userRepository, passwordEncoder);

        // when
        OutOfBrainUser actualUser = userService.createUser(userCreationDTO);
        OutOfBrainUser expectedUser = new OutOfBrainUser("testUser", "hashedPassword");


        // then
        Mockito.verify(userRepository).save(expectedUser);
    }

    @Test
    void userCreationShouldFailBecausePasswordsDoNotMatch() {
        // given
        UserService userService = new UserService(null, null);
        UserCreationDTO userCreationDTO = new UserCreationDTO("testUser", "password", "passw0rd");
        // when
        Assertions.assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> userService.createUser(userCreationDTO))
                .withMessage("passwords do not match");
    }


    @Test
    void userCreationShouldFailBecauseUsernameIsNull() {
        // given
        UserService userService = new UserService(null, null);
        UserCreationDTO userCreationDTO = new UserCreationDTO(null, "password", "password");
        // when
        Assertions.assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> userService.createUser(userCreationDTO))
                .withMessage("username is blank");
    }


    @Test
    void userCreationShouldFailBecauseUsernameIsBlank() {
        // given
        UserService userService = new UserService(null, null);
        UserCreationDTO userCreationDTO = new UserCreationDTO(" ", "password", "password");
        // when
        Assertions.assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> userService.createUser(userCreationDTO))
                .withMessage("username is blank");
    }

}