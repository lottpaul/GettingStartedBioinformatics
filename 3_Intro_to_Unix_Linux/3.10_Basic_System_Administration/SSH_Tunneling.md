# SSH Tunneling
Tunneling allows you to direct network ports from one machine to another machine over SSH. Either by forwarding traffic across the SSH tunnel or reverse - getting information from the tunnel.

SSH typically uses port 22 to communicate between different computers. But also provides functionality to direct ports from one computer to another computer.

[Wikipedia: List of TCP/UDP Reserved Ports](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers)

Tunneling can be very useful when firewalls are in place to limit traffic on certain ports.  For example, you may not want employees computers to be hosting websites on port 80 and 443.  But if the employee has access to that computer through SSH, he/she could tunnel in to port 80 and 443 on that machine to access the web page.

You can typically utilize SSH Tunneling to access web pages, services, databases, remote desktop, VNC from a remote machine on your local machine.

-N - No commands run - so don't need a terminal
-f - Move SSH process to background
-L - forwarded to the given host and port,
-R

## Port Forwarding
Port forwarding creates a SSH connection and tells the remote computer to forward any network traffic on the specific port to to local machines.  On your local machine you can direct the information to the same port or a different port.

**Basic Syntax**
```bash
$ ssh -N -f -L <local IP address>:<local port>:<remote IP address>:<remote port> username@remoteserver.com 
```

**Example Usage**
To connect to VNC port on the remote server running at port 5901 - I can tunnel in via SSH and direct it to my local computer port 5900.
```bash
$ ssh -N -f -L localhost:5900:localhost:5901 lottpaul@remoteserver.com
```

If I was already using port 5900 on my local computer, I'd want to change it to a different port that wasn't being used.

### Common Mistakes
Often one of the first mistakes that individuals make is to start the tunnel on the remote machine to the remote machine.  This essentially generates a looped tunnel to the same machine.  

If this happens, simply find the process id number (PID) of the SSH tunnel using `ps x` and `kill <PID>` it.  

## Reverse Tunneling
Reverse tunneling is essentially the opposite of Port Forwarding.  Instead of setting up a tunnel where the server is forwarding information from a particular port to your local computer.  You want to make a information or services runnin on a port on your local computer accessible on the remote server. 

```bash
$ ssh -N -f -R <local port>:<remote address>:<remote port> user @remoteserver.com
```
```bash
ssh -N -f -R 3306:localhost:3306 plott@lavellan.genomecenter.ucdavis.edu
```