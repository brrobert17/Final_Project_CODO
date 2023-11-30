const os = require('os');
const fs = require('fs');
const path = require('path');

const getWirelessIP = () => {
    const interfaces = os.networkInterfaces();
    const wirelessAdapterName = 'Wi-Fi'; // Replace 'Wi-Fi' with the actual name of your wireless adapter

    if (interfaces[wirelessAdapterName]) {
        for (const iface of interfaces[wirelessAdapterName]) {
            if ('IPv4' === iface.family && !iface.internal) {
                return iface.address;
            }
        }
    } else {
        console.log('Wireless network interface not found.');
        return null;
    }
};
const updateConfigFile = (ip) => {
    const filePath = path.join(__dirname, 'ip4.ts');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        if (ip) {
            const result = data.replace(/http:\/\/[0-9]+(?:\.[0-9]+){3}:[0-9]+/, `http://${ip}:5000`);

            fs.writeFile(filePath, result, 'utf8', (writeErr) => {
                if (writeErr) console.error(writeErr);
                else console.log(`API Base URL updated to http://${ip}:5000`);
            });
        } else {
            console.error('IP address is undefined');
        }
    });
};

const ip4w = getWirelessIP();
if (ip4w) {
    console.log(`Wireless IPv4 Address: ${ip4w}`);
    updateConfigFile(ip4w);
} else {
    console.error('No IPv4 address found for the wireless adapter.');
}

