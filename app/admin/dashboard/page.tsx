"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"

interface Service {
  id: string
  title: string
  description: string
  price: string
  status: "active" | "draft"
}

interface Testimonial {
  id: string
  name: string
  company: string
  content: string
  rating: number
  status: "published" | "draft"
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [services, setServices] = useState<Service[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [newService, setNewService] = useState({ title: "", description: "", price: "", status: "draft" as const })
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    company: "",
    content: "",
    rating: 5,
    status: "draft" as const,
  })

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin-authenticated")
    const userData = localStorage.getItem("admin-user")

    if (!isAuthenticated) {
      router.push("/admin/login")
      return
    }

    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Load demo data
    const demoServices: Service[] = [
      {
        id: "1",
        title: "Social Media Marketing",
        description: "Complete social media management and growth",
        price: "$999/month",
        status: "active",
      },
      {
        id: "2",
        title: "Music Video Production",
        description: "Professional music video creation",
        price: "$2,999",
        status: "active",
      },
      {
        id: "3",
        title: "Playlist Placement",
        description: "Get your music on popular playlists",
        price: "$499",
        status: "draft",
      },
    ]

    const demoTestimonials: Testimonial[] = [
      {
        id: "1",
        name: "Sarah Johnson",
        company: "Indie Artist",
        content: "Motion Records helped me grow my fanbase by 300%!",
        rating: 5,
        status: "published",
      },
      {
        id: "2",
        name: "Mike Chen",
        company: "Rock Band",
        content: "Professional service and amazing results.",
        rating: 5,
        status: "published",
      },
      {
        id: "3",
        name: "Lisa Rodriguez",
        company: "Pop Singer",
        content: "Best investment I made for my music career.",
        rating: 4,
        status: "draft",
      },
    ]

    setServices(demoServices)
    setTestimonials(demoTestimonials)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin-authenticated")
    localStorage.removeItem("admin-user")
    router.push("/admin/login")
  }

  const addService = () => {
    if (newService.title && newService.description && newService.price) {
      const service: Service = {
        id: Date.now().toString(),
        ...newService,
      }
      setServices([...services, service])
      setNewService({ title: "", description: "", price: "", status: "draft" })
    }
  }

  const addTestimonial = () => {
    if (newTestimonial.name && newTestimonial.content) {
      const testimonial: Testimonial = {
        id: Date.now().toString(),
        ...newTestimonial,
      }
      setTestimonials([...testimonials, testimonial])
      setNewTestimonial({ name: "", company: "", content: "", rating: 5, status: "draft" })
    }
  }

  const deleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const deleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter((t) => t.id !== id))
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Icons.spinner className="h-8 w-8 animate-spin text-white" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user.name}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            <Icons.logOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Services</CardTitle>
              <Icons.briefcase className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{services.length}</div>
              <p className="text-xs text-gray-400">{services.filter((s) => s.status === "active").length} active</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Testimonials</CardTitle>
              <Icons.messageSquare className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{testimonials.length}</div>
              <p className="text-xs text-gray-400">
                {testimonials.filter((t) => t.status === "published").length} published
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Average Rating</CardTitle>
              <Icons.star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {testimonials.length > 0
                  ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
                  : "0"}
              </div>
              <p className="text-xs text-gray-400">out of 5 stars</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="services" className="data-[state=active]:bg-gray-700 text-gray-300">
              Services
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-gray-700 text-gray-300">
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-700 text-gray-300">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Add New Service</CardTitle>
                <CardDescription className="text-gray-400">Create a new service offering</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="service-title" className="text-gray-300">
                      Title
                    </Label>
                    <Input
                      id="service-title"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Service title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service-price" className="text-gray-300">
                      Price
                    </Label>
                    <Input
                      id="service-price"
                      value={newService.price}
                      onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="$999"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="service-description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="service-description"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Service description"
                  />
                </div>
                <Button onClick={addService} className="bg-blue-600 hover:bg-blue-700">
                  <Icons.plus className="mr-2 h-4 w-4" />
                  Add Service
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Existing Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-white">{service.title}</h3>
                          <Badge variant={service.status === "active" ? "default" : "secondary"}>
                            {service.status}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-1">{service.description}</p>
                        <p className="text-green-400 font-semibold">{service.price}</p>
                      </div>
                      <Button onClick={() => deleteService(service.id)} variant="destructive" size="sm">
                        <Icons.trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Add New Testimonial</CardTitle>
                <CardDescription className="text-gray-400">Add a client testimonial</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="testimonial-name" className="text-gray-300">
                      Client Name
                    </Label>
                    <Input
                      id="testimonial-name"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="testimonial-company" className="text-gray-300">
                      Company
                    </Label>
                    <Input
                      id="testimonial-company"
                      value={newTestimonial.company}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Company name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="testimonial-content" className="text-gray-300">
                    Testimonial
                  </Label>
                  <Textarea
                    id="testimonial-content"
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Client testimonial"
                  />
                </div>
                <div>
                  <Label htmlFor="testimonial-rating" className="text-gray-300">
                    Rating
                  </Label>
                  <Input
                    id="testimonial-rating"
                    type="number"
                    min="1"
                    max="5"
                    value={newTestimonial.rating}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number.parseInt(e.target.value) })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <Button onClick={addTestimonial} className="bg-green-600 hover:bg-green-700">
                  <Icons.plus className="mr-2 h-4 w-4" />
                  Add Testimonial
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Existing Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="flex items-start justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-white">{testimonial.name}</h3>
                          <Badge variant={testimonial.status === "published" ? "default" : "secondary"}>
                            {testimonial.status}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{testimonial.company}</p>
                        <p className="text-gray-300 mb-2">"{testimonial.content}"</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Icons.star
                              key={i}
                              className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <Button onClick={() => deleteTestimonial(testimonial.id)} variant="destructive" size="sm">
                        <Icons.trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Site Settings</CardTitle>
                <CardDescription className="text-gray-400">Configure your site settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site-title" className="text-gray-300">
                    Site Title
                  </Label>
                  <Input
                    id="site-title"
                    defaultValue="Motion Records LLC"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-gray-300">
                    Contact Email
                  </Label>
                  <Input
                    id="contact-email"
                    defaultValue="hello@motionrecords.com"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-phone" className="text-gray-300">
                    Contact Phone
                  </Label>
                  <Input
                    id="contact-phone"
                    defaultValue="+1 (555) 123-4567"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="social-twitter" className="text-gray-300">
                    Twitter Handle
                  </Label>
                  <Input
                    id="social-twitter"
                    defaultValue="@motionrecords"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Icons.save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
