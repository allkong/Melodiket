package com.ssafy.jdbc.melodiket.user.controller;

import com.ssafy.jdbc.melodiket.auth.service.AuthService;
import com.ssafy.jdbc.melodiket.auth.service.UserService;
import com.ssafy.jdbc.melodiket.user.entity.AppUser;
import com.ssafy.jdbc.melodiket.user.controller.dto.UpdateUserReq;
import com.ssafy.jdbc.melodiket.user.controller.dto.UserProfileResp;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserProfileResp> getAuthenticatedUserProfile(Principal principal) {
        String loginId = principal.getName();
        UserProfileResp userProfile = userService.getUserProfileByLoginId(loginId);
        return ResponseEntity.ok(userProfile);
    }

    @PatchMapping("/me")
    public ResponseEntity<UserProfileResp> updateUser(@RequestBody UpdateUserReq updateUserReq, Authentication authentication){
        AppUser user = (AppUser) authentication.getPrincipal();
        UserProfileResp updateUser = authService.updateUser(user.getUuid(), updateUserReq);
        return ResponseEntity.ok(updateUser);
    }

}
