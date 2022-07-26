const express = require('express');

const app = express();

const members = require('./members');

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

app.listen(3000, () => {
    console.log('Server is listing...')
});

