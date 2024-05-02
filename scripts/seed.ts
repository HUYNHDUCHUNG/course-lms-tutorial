
const {PrismaClient} = require("@prisma/client")

const databbase = new PrismaClient();

async function main() {
    try {
        await databbase.category.createMany({
            data:[
                {name: "Computer Science"},
                {name: "Music"},
                {name: "Fitness"},
                {name: "Photography"},
                {name: "Accounting"},
                {name: "Engineering"},
                {name: "Filming"},
            ]
        });


        console.log("Succes");
    } catch (error) {
        console.log("Error seeding the databbase categories",error);
    }finally{
        await databbase.$disconnect
    }
}

main();