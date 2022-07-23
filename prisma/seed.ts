import bcrypt from "bcrypt";
import { prisma } from "../src/config/database.js";


// create admin user
async function main(){
  const SALT = 10;
  const hashedPassword = bcrypt.hashSync("admin", SALT);

	// cria se já não existe -> se já existe, faz nada
  await prisma.users.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      password: hashedPassword
    }
  });

  for (const item in [1, 2, 3, 4, 5, 6]) {
    await prisma.terms.upsert({
        where: { number: parseInt(item) },
        update: {},
        create: {
            number: parseInt(item),
        }
    });
  }

  for (const item in ['Projetos', 'Prática', 'Recuperação']) {
    await prisma.categories.upsert({
        where: { name: item },
        update: {},
        create: {
            name: item,
        }
    });
  }

  for (const teacher in ['Diego Pinho', 'Bruna Hamori']) {
    await prisma.teachers.upsert({
        where: { name: teacher },
        update: {},
        create: {
            name: teacher,
        }
    });
  }

  const disciplines = [
                        {name:'HTML e CSS', termId: 1},
                        {name:'JavaScript', termId: 2},
                        {name:'React', termId: 3},
                        {name:'Humildade', termId: 1},
                        {name:'Planejamento', termId: 2},
                        {name:'Autoconfiança', termId: 3},
                      ];
  for (const item in disciplines ) {
    await prisma.disciplines.upsert({
        where: { name: disciplines[item].name },
        update: {},
        create: {
            name: disciplines[item].name,
            termId: disciplines[item].termId,
        }
    });
  }

  // const disciplinesTeachers = [
  //                               {disciplineId: 1, teacherId: 1},
  //                               {disciplineId: 1, teacherId: 2},
  //                               {disciplineId: 1, teacherId: 3},
  //                               {disciplineId: 2, teacherId: 4},
  //                               {disciplineId: 2, teacherId: 5},
  //                               {disciplineId: 2, teacherId: 6},
  // ];

  // disciplinesTeachers.forEach(async (item,index) => {

  //   await prisma.teachersDisciplines.upsert({
  //       where: { id: index },
  //       update: {},
  //       create: item
  //   });
  // }
}


main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})