const express = require('express');

const app = express();

let members = require('./members');

app.use(express.json());

// json 형태로 저장되어 있는 member 정보 모두 출력하기
app.get('/api/members', (req, res) => {
    const {team} = req.query; 
    // const team = req.query.team 과 동일한 내용
    if (team) {
        const teamMembers = members.filter((m) => m.team === team);
        res.send(teamMembers);
    } else {
        res.send(members);
    }
})

// id 별로 직원 정보 출력하기 위한 코드
app.get('/api/members/:id', (req, res) => {
    const { id }= req.params;
    const member = members.find((m) => m.id === Number(id));
    if (member) {
        res.send(member);
    } else {
        res.status(404).send({message : 'There is no such member with the id!!'});
    }
});

app.post('/api/members', (req,res) => {
    const newMember = req.body;
    members.push(newMember);
    res.send(newMember);
})

app.put('/api/members/:id', (req, res) => {
    const {id} = req.params;
    const newInfo = req.body;
    const member = members.find((m) => m.id === Number(id));
    if (member) {
        // Object.keys -> 각 프로퍼티의 이름들이 하나에 배열에 담아 리턴
        // Object.entries -> 각 프로퍼티의 이름(key)-값(value) 쌍을 담은 배열을 리턴 
        // 아니면 for (const property in newInfo) {console.log(property);}도 가능 -> 이름들만 
        // 값도 출력하려면 console.log('key: ${property} => value: ${newInfo[property]}')로 작성해주면 된다! 
        Object.keys(newInfo).forEach((prop) => {
            member[prop] = newInfo[prop];
        });
        res.send(member);
    } else {
        res.status(404).send({ message: 'There is no member with the id!'});
    }
});

app.delete('/api/members/:id', (req, res) => {
    const {id} = req.params;
    const membersCount = members.length;
    members = members.filter((member) => member.id !== Number(id));
    if (members.length < membersCount) {
        res.send({message: 'Deleted'});
    } else {
        res.status(404).send({message : 'There is no member with the id!'})
    }
});

app.listen(3000, () => {
    console.log('Server is listing...')
});

