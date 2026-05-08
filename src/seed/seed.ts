
import { prisma } from "../config/Prisma";
import { faker } from "@faker-js/faker";





const artisans = [
  {
    name: "Jean Mballa",
    email: "jean.mballa@gmail.com",
    phone: "697452318",
    town: "Douala",
    district: "Akwa",
    service: "Plomberie générale",
    pictureUrl: "https://i.pravatar.cc/300?img=1"
  },
  {
    name: "Aïcha Soule",
    email: "aicha.soule@yahoo.com",
    phone: "672819405",
    town: "Maroua",
    district: "Domayo",
    service: "Couture et broderie",
    pictureUrl: "https://i.pravatar.cc/300?img=2"
  },
  {
    name: "Franck Ngono",
    email: "franck.ngono@gmail.com",
    phone: "699183742",
    town: "Yaoundé",
    district: "Bastos",
    service: "Électricité bâtiment",
    pictureUrl: "https://i.pravatar.cc/300?img=3"
  },
  {
    name: "Sarah Wamba",
    email: "sarah.wamba@gmail.com",
    phone: "655204917",
    town: "Buea",
    district: "Molyko",
    service: "Coiffure professionnelle",
    pictureUrl: "https://i.pravatar.cc/300?img=4"
  },
  {
    name: "Paul Kotto",
    email: "paul.kotto@gmail.com",
    phone: "677390184",
    town: "Douala",
    district: "Bonapriso",
    service: "Menuiserie bois",
    pictureUrl: "https://i.pravatar.cc/300?img=5"
  },
  {
    name: "Fatima Abba",
    email: "fatima.abba@gmail.com",
    phone: "681572903",
    town: "Maroua",
    district: "Pitoaré",
    service: "Tapisserie et décoration",
    pictureUrl: "https://i.pravatar.cc/300?img=6"
  },
  {
    name: "Eric Tchinda",
    email: "eric.tchinda@gmail.com",
    phone: "690481275",
    town: "Yaoundé",
    district: "Nlongkak",
    service: "Réparation électroménager",
    pictureUrl: "https://i.pravatar.cc/300?img=7"
  },
  {
    name: "Linda Ngu",
    email: "linda.ngu@gmail.com",
    phone: "663917284",
    town: "Buea",
    district: "Great Soppo",
    service: "Pâtisserie artisanale",
    pictureUrl: "https://i.pravatar.cc/300?img=8"
  },
  {
    name: "Samuel Tamba",
    email: "samuel.tamba@gmail.com",
    phone: "679302618",
    town: "Douala",
    district: "New Bell",
    service: "Peinture bâtiment",
    pictureUrl: "https://i.pravatar.cc/300?img=9"
  },
  {
    name: "Hassan Djibril",
    email: "hassan.djibril@gmail.com",
    phone: "688145709",
    town: "Maroua",
    district: "Ziling",
    service: "Soudure métallique",
    pictureUrl: "https://i.pravatar.cc/300?img=10"
  }
]

const seed = async ()=>{

    //Nettoyage
    await Promise.all([
        prisma.users.deleteMany(),
        prisma.artisans.deleteMany()
    ])

    //pour chaque artisan on cree un user
    // for(const data of artisans)
    // {
    //     const user = await prisma.users.create({
    //         data:{
    //             username: data.name,
    //             email: data.email,
    //             password: faker.internet.password(),
    //             role: "ARTISAN"
    //         }
    //     })


    //     const artisan = await prisma.artisans.create({
    //         data:{
    //             userId: user.id,
    //             ...data
    //         }
    //     })
    // }
    
}

seed()
    .catch(console.error)
    .finally(()=>prisma.$disconnect)

