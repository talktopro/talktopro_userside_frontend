import { Button } from "@/components/ui/button"

const HomePage = () => {
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="space-y-3">
                <h1>Home Page</h1>
                <p>Welcome to the TalktoPro Homepage.</p>
                <p>This is a placeholder for the main content of the home page.</p>
                <Button>Primary</Button>
                <Button className="ml-4" variant="outline">Outline</Button>
            </div>
        </div>
    )
}

export default HomePage