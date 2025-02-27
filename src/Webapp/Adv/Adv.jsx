import React from "react"
import { Search, Bell, Moon, Star, Home, Users, BookOpen, Video, Calendar, CreditCard, Library, AlertTriangle, ChevronRight } from "lucide-react"

// Badge Component
function Badge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}

// Button Component 
function Button({ variant = "default", size = "default", children, className = "", ...props }) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-purple-500 text-white hover:bg-purple-600",
    ghost: "hover:bg-gray-100",
    link: "text-purple-500 hover:underline",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    icon: "h-10 w-10",
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// Card Components
function Card({ children, className = "" }) {
  return <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>
}

function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

// Avatar Component
function Avatar({ src, fallback, className = "" }) {
  return (
    <div className={`relative h-10 w-10 rounded-full overflow-hidden ${className}`}>
      {src ? (
        <img src={src || "/placeholder.svg"} alt="Avatar" className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-purple-100 text-purple-500 font-medium">
          {fallback.slice(0, 2)}
        </div>
      )}
    </div>
  )
}

// Progress Component
function Progress({ value, className = "" }) {
  return (
    <div className={`h-2 w-full bg-gray-100 rounded-full ${className}`}>
      <div
        className="h-full bg-purple-500 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

// NavItem Component
function NavItem({ icon, label, active = false }) {
  const Icon = icon
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-purple-100 ${active ? 'bg-purple-100 text-purple-600' : 'text-gray-500'}`}>
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </div>
  )
}

// Main Dashboard Component
export default function LibraryDashboard() {
  const popularBooks = [
    { id: 1, title: "The Notice is an essent...", description: "This is just a general example..." },
    { id: 2, title: "The Notice is an essent...", description: "This is just a general example..." },
    { id: 3, title: "The Notice is an essent...", description: "This is just a general example..." },
    { id: 4, title: "The Notice is an essent...", description: "This is just a general example..." },
  ]

  const ongoingBooks = [...popularBooks]

  const bestSales = [
    { id: 1, title: "Grow green", rating: 4.5 },
    { id: 2, title: "Raise a plant", rating: 4.0 },
    { id: 3, title: "One question", rating: 4.5 },
    { id: 4, title: "Unplug day", rating: 4.0 },
    { id: 5, title: "Best year", rating: 3.5 },
  ]

  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Left Sidebar */}
      {/* <div className="w-64 bg-white p-6 flex flex-col h-screen sticky top-0">
        
        <div className="flex items-center gap-2 mb-10">
          <div className="h-8 w-8 bg-purple-500 rounded flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">EERA</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem icon={Home} label="Home" />
          <NavItem icon={Users} label="Students" />
          
          <NavItem icon={BookOpen} label="Courses" />
          <NavItem icon={Video} label="Live Class" />
          <NavItem icon={Calendar} label="Attendance" />
          <NavItem icon={CreditCard} label="Account Settings" />
          <NavItem icon={Library} label="Your Notices" active={true} />
          <NavItem icon={AlertTriangle} label="Reports" />
        </nav>

        <div className="mt-auto">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-2">Publish Your Own Notice Now!</p>
            <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2">
              Publish
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="p-4 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="search"
              placeholder="Search.."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-red-400 text-white w-18 h-10">Log Out</Badge>
            <Button variant="ghost" size="icon">
              <Moon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar fallback="S" />
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-purple-500 text-white p-12 rounded-3xl mx-4 relative overflow-hidden">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Hi, Irham Muhammad Shidiq</h1>
            <p className="text-purple-100 mb-6">
              The library serves as a welcoming home for knowledge seekers and avid readers alike
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="p-4 grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3">
            {/* Popular Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Saved</h2>
                <Button variant="link">VIEW ALL</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularBooks.map((book) => (
                  <Card key={book.id}>
                    <CardContent>
                      <div className="aspect-square bg-purple-100 rounded-lg mb-4"></div>
                      <h3 className="font-semibold mb-2">{book.title}</h3>
                      <p className="text-sm text-gray-500">{book.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Ongoing Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Downloaded</h2>
                <Button variant="link">VIEW ALL</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ongoingBooks.map((book) => (
                  <Card key={book.id}>
                    <CardContent>
                      <div className="aspect-square bg-purple-100 rounded-lg mb-4"></div>
                      <h3 className="font-semibold mb-2">{book.title}</h3>
                      <p className="text-sm text-gray-500">{book.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
           
           
            {/* <Card>
              <CardContent>
                <h2 className="text-xl font-bold mb-4">Unlocks achievement</h2>
                <p className="text-sm text-gray-500 mb-4">Goal achieved success unlocked.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar fallback="U1" />
                    <div className="flex-1">
                      <Progress value={66} className="mb-2" />
                      <div className="flex justify-between text-sm">
                        <span>66% Achieved</span>
                        <span>7 Days left</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar fallback="U2" />
                    <div className="flex-1">
                      <Progress value={33} className="mb-2" />
                      <div className="flex justify-between text-sm">
                        <span>33% Achieved</span>
                        <span>12 Days left</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* Best Sales */}
            <Card>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Published</h2>
                  <Button variant="link">VIEW ALL</Button>
                </div>
                <div className="space-y-4">
                  {bestSales.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg"></div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm ml-1">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button>View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}