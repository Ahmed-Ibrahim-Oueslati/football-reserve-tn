"use client"

import { useState, useEffect } from "react"
import { Button } from "src/components/ui/button"
import { Input } from "src/components/ui/input"
import { Label } from "src/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs"
import { Badge } from "src/components/ui/badge"
import { Separator } from "src/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar"
import { User, Mail, Phone } from "lucide-react"
import { Header } from "src/components/header"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setFormData({
      name: parsedUser.name,
      email: parsedUser.email,
      phone: parsedUser.phone,
    })
  }, [router])

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveProfile = () => {
    const updatedUser = { ...user, ...formData }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return <div>Chargement...</div>
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mon profil</h1>
            <p className="text-muted-foreground">Gérez vos informations personnelles et préférences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-lg bg-green-600 text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>

                    <div className="space-y-2">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        Membre actif
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Membre depuis{" "}
                        {new Date(user.joinDate).toLocaleDateString("fr-FR", {
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    <Button variant="outline" onClick={handleLogout} className="w-full bg-transparent">
                      Se déconnecter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profil</TabsTrigger>
                  <TabsTrigger value="preferences">Préférences</TabsTrigger>
                  <TabsTrigger value="security">Sécurité</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Informations personnelles</CardTitle>
                          <CardDescription>Mettez à jour vos informations de profil</CardDescription>
                        </div>
                        <Button
                          variant={isEditing ? "default" : "outline"}
                          onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                          className={isEditing ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {isEditing ? "Sauvegarder" : "Modifier"}
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom complet</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-medium">Statistiques du compte</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">12</div>
                            <div className="text-sm text-muted-foreground">Réservations</div>
                          </div>
                          <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">3</div>
                            <div className="text-sm text-muted-foreground">Terrains favoris</div>
                          </div>
                          <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">4.8★</div>
                            <div className="text-sm text-muted-foreground">Note moyenne</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle>Préférences</CardTitle>
                      <CardDescription>Personnalisez votre expérience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">Notifications par email</div>
                            <div className="text-sm text-muted-foreground">
                              Recevoir des emails pour les confirmations et rappels
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Activé
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">Notifications SMS</div>
                            <div className="text-sm text-muted-foreground">
                              Recevoir des SMS de rappel avant vos réservations
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Activé
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">Offres promotionnelles</div>
                            <div className="text-sm text-muted-foreground">
                              Recevoir des offres spéciales et promotions
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Désactivé
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-medium">Préférences de réservation</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Ville préférée</Label>
                            <Input value="Tunis" disabled />
                          </div>
                          <div className="space-y-2">
                            <Label>Type de terrain préféré</Label>
                            <Input value="Gazon naturel" disabled />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sécurité</CardTitle>
                      <CardDescription>Gérez la sécurité de votre compte</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">Mot de passe</div>
                            <div className="text-sm text-muted-foreground">Dernière modification il y a 30 jours</div>
                          </div>
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">Authentification à deux facteurs</div>
                            <div className="text-sm text-muted-foreground">Sécurisez votre compte avec la 2FA</div>
                          </div>
                          <Button variant="outline" size="sm">
                            Configurer
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">Sessions actives</div>
                            <div className="text-sm text-muted-foreground">Gérez vos sessions de connexion</div>
                          </div>
                          <Button variant="outline" size="sm">
                            Voir tout
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-medium text-red-600">Zone de danger</h4>
                        <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950 dark:border-red-800">
                          <div className="space-y-2">
                            <div className="font-medium text-red-800 dark:text-red-200">Supprimer le compte</div>
                            <div className="text-sm text-red-600 dark:text-red-300">
                              Cette action est irréversible. Toutes vos données seront supprimées.
                            </div>
                            <Button variant="destructive" size="sm">
                              Supprimer mon compte
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
