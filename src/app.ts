import express from 'express';
import motorcycleRoutes from './routes/motorcycle.routes';
import userRoutes from './routes/user.routes';
import rideRoutes from './routes/ride.routes';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenue sur Moto Planner 🏍️');
});


app.use('/motorcycles', motorcycleRoutes);
app.use('/users', userRoutes);
app.use('/rides', rideRoutes);




export default app;
