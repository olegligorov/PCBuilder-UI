import { BuilderTable } from "./BuilderTable"

const BuildPage = () => {
  return (
    <section className="bg-background text-foreground">
      <div className="container mx-auto">

        <h1 className="text-3xl font-bold my-8 flex justify-center text-center">
          Build Your Perfect PC with PCBuilder
        </h1>

        <BuilderTable></BuilderTable>
      </div>

    </section >
  )
}

export default BuildPage