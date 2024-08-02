<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Dotenv\Exception\ValidationException;
use Exception;
class AuthController extends Controller
{
    // Register
    public function register(RegisterRequest $request) {

        try {
            $user = new User();

            $validated = $request->validated();
    
            $name = $validated["name"];
            $surname = $validated["surname"];
            $email = $validated["email"];
            $password = $validated["password"];
    
            $user->name = $name;
            $user->surname = $surname;
            $user->email = $email;
            $user->password = $password;
    
            $user->save();
    
            return response()->json([
                "status" => true,
                "message" => "Hesabınız oluşturuldu.",
                "user" => [
                    "id" => $user->id,
                    "name" => $user->name
                ]
            ], 201);
        }
        catch(ValidationException $err) {
            return response()->json([
                "status" => false,
                "message" => "Girdiğiniz veriler doğrulanamadı. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.",
                "error" => $err
             ]);
        }
        catch(Exception $err){
            return response()->json([
               "status" => false,
               "message" => "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
               "error" => $err->getMessage()
            ]);
        }

    }

    // Login
    public function login(LoginRequest $request) {
        
        try {

            $validated = $request->validated();

            $email = $validated["email"];
            $password = $validated["password"];
    
            $credentials  = ['email' => $email, 'password' => $password];
    
            $token = auth()->attempt($credentials);
    
            if($token) {
                return response()->json([
                    "status" => true,
                    "message" => "Giriş yapıldı.",
                    "token" => $token,
                    "expires_in" => auth("api")->factory()->getTTL() * 60
                ], 201);
            }
            else {
                return response()->json([
                    "status" => false,
                    "message" => "Hesap bilgilerinizi kontrol ediniz."
                ], 401);
            }

        }
        catch(ValidationException $err) {
            return response()->json([
                "status" => false,
                "message" => "Girdiğiniz veriler doğrulanamadı. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.",
                "error" => $err
             ]);
        }
        catch(Exception $err){
            return response()->json([
               "status" => false,
               "message" => "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
               "error" => $err->getMessage()
            ]);
        }
    }

    // Me
    public function me() {

        try {
            $user = auth("api")->user();

            return response()->json($user);
        }
        catch(Exception $err){
            return response()->json([
               "status" => false,
               "message" => "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
               "error" => $err->getMessage()
            ]);
        }

    }

    // Logout
    public function logout() {
        try {
            auth()->logout();

            return response()->json([
                "status" => true,
                "message" => "Çıkış Yapıldı"                
            ]);
        }
        catch(Exception $err){
            return response()->json([
               "status" => false,
               "message" => "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
               "error" => $err->getMessage()
            ]);
        }

    }
}

