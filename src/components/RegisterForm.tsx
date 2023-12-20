import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser } from "@/lib/models";
import { useAuth } from "@/store/auth-context";
import { useState } from "react";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const { login } = useAuth();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Sign up now.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Ay0ub"
            value={firstName}
            onChange={(elt) => {
              setFirstName(elt.target.value);
            }}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="N0uri"
            value={lastName}
            onChange={(elt) => {
              setLastName(elt.target.value);
            }}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Ay0ub@n0uri.com"
            value={email}
            onChange={(elt) => {
              setEmail(elt.target.value);
            }}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Ay0ub"
            value={username}
            onChange={(elt) => {
              setUsername(elt.target.value);
            }}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="*********"
            value={password}
            onChange={(elt) => {
              setPassword(elt.target.value);
            }}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={async () => {
            console.log(firstName, lastName, username, email, password);
            var user: IUser = {
              id: 0,
              firstName,
              lastName,
              username,
              email,
              password,
              roles: []
            }
            const response = await fetch('http://localhost:8080/api/v1/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
            });
            if (response.ok) {
              var token = await response.json();
              const resp = await fetch("http://localhost:8080/api/v1/auth/userinfo", {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token.token}`
                },
              });
              if (resp.ok) {
                var loggedUser: IUser = await resp.json();
                console.log(token, loggedUser);
                login(loggedUser, token.token);
                toast.success("Successfully authenticated");
              }
              else {
                toast.error("Authentication failed");
              }
            }
            else {
              console.log(response.status);
              toast.error("Authentication failed");
            }
          }}
        >
          Sign up
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
