import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

const HomePage: React.FC = () => {
  return (
    <>
      <section className="bg-background text-foreground">
        <div className="container mx-auto px-6 py-16 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold my-6">
            Build Your Perfect PC with <span className="text-primary">PCBuilder</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl my-12">
            Choose the best parts for your budget and performance needs. Whether you're gaming, editing, or building your first rig — we’ve got you covered.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="text-lg px-6 py-3 cursor-pointer">
              <Link to="/build">Get Started</Link>

            </Button>
            <Button variant="outline" className="text-lg px-6 py-3 cursor-pointer">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Why Use PCBuilder?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Smart Part Matching</h3>
                <p className="text-muted-foreground">
                  Our intelligent system ensures all your components are compatible.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Real-Time Pricing</h3>
                <p className="text-muted-foreground">
                  Get up-to-date prices from major vendors to fit your budget.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Performance Insights</h3>
                <p className="text-muted-foreground">
                  Understand what performance to expect before you buy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage