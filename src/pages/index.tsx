import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Modal,
  TextField,
  IconButton,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: string;
}

const Home = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const theme = useTheme();

  const fetchTickets = async () => {
    const response = await fetch('/api/tickets');
    const data = await response.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      fetchTickets(); // Refresh tickets
      setIsCreateModalOpen(false);
      setTitle('');
      setDescription('');
    }
  };

  const handleOpenUpdateModal = (ticket: Ticket) => {
    setCurrentTicket(ticket);
    setTitle(ticket.title);
    setDescription(ticket.description);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentTicket) return;

    const response = await fetch(`/api/tickets/${currentTicket._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      fetchTickets(); // Refresh tickets
      setIsUpdateModalOpen(false);
      setCurrentTicket(null);
      setTitle('');
      setDescription('');
    }
  };

  const handleOpenDeleteDialog = (ticket: Ticket) => {
    setCurrentTicket(ticket);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteTicket = async () => {
    if (!currentTicket) return;

    const response = await fetch(`/api/tickets/${currentTicket._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchTickets(); // Refresh tickets
      setIsDeleteDialogOpen(false);
      setCurrentTicket(null);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: theme.palette.primary.main }}
      >
        Tickets
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsCreateModalOpen(true)}
        sx={{ mb: 3 }}
      >
        Create Ticket
      </Button>
      <Grid container spacing={3}>
        {tickets.map((ticket) => (
          <Grid item xs={12} sm={6} md={4} key={ticket._id}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[2],
                '&:hover': {
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <Typography variant="h6" gutterBottom>
                {ticket.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {ticket.description}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleOpenUpdateModal(ticket)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleOpenDeleteDialog(ticket)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Create Modal */}
      <Modal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[5],
            p: 4,
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h6">Create Ticket</Typography>
            <IconButton onClick={() => setIsCreateModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleCreateTicket}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Create
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Update Modal */}
      <Modal open={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[5],
            p: 4,
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h6">Update Ticket</Typography>
            <IconButton onClick={() => setIsUpdateModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleUpdateTicket}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Update
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this ticket? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTicket} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
