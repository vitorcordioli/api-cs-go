# 🎯 CS2 Competitive API

A REST API for managing players and clubs in the CS2 competitive scene. Create teams, sign players, transfer them between clubs, and release them to free agency.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose

### Installation

```bash
git clone https://github.com/your-user/your-repo
cd your-repo
npm install
```

### Environment Setup

Create a `.env` file in the root directory, like the `.env.example`


### Running the API

```bash
# Start the database
docker compose up -d

# Start the server
npm run start:watch
```

---

## 📋 Endpoints

### 🔍 Health Check

#### API status
```http
GET /
```

---

### 🏆 Clubs

#### List all clubs
```http
GET /clubs
```

#### Get club by ID
```http
GET /clubs/:teamId
```

#### Create club
```http
POST /clubs
```
```json
{
  "team": "FURIA Esports",
  "players": [
    {
      "name": "fallen",
      "age": 32,
      "role": "IGL"
    }
  ]
}
```

#### Update club name
```http
PATCH /clubs/:teamId
```
```json
{
  "team": "Team Liquid"
}
```

#### Delete club
```http
DELETE /clubs/:teamId
```

---

### 👤 Players

#### List all players
```http
GET /players
```

#### Get player by ID
```http
GET /players/:id
```

#### Create player
```http
POST /players
```
```json
{
  "teamId": 4,
  "player": {
    "name": "fallen",
    "age": 32,
    "role": "IGL"
  }
}
```

#### Update player info
```http
PATCH /players/:id
```
```json
{
  "player": {
    "name": "fallen",
    "age": 32,
    "role": "AWPer"
  }
}
```

#### Transfer player to another club
```http
PATCH /players/:id/transfer
```
```json
{
  "teamId": 3
}
```

#### Release player (sends to Free Agents)
```http
DELETE /players/:id/release
```

#### Delete player
```http
DELETE /players/:id
```

---

## 🎮 Player Roles

| Role | Description |
|------|-------------|
| `IGL` | In-Game Leader — calls strategies |
| `AWPer` | Primary sniper |
| `Rifler` | Entry fragger / Support |

---

## 🗂️ Data Models

### Club
```typescript
{
  id: number
  name: string
  players: Player[]
}
```

### Player
```typescript
{
  id: number
  name: string
  age: number
  role: string
  clubId: number
}
```

---

## 🛠️ Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Container:** Docker

---

## 📄 License

MIT
