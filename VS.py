import segno

print("Generating QR Code")
qrcode = segno.make('https://www.facebook.com/aiwithibrar')
qrcode.save('my_code.png',scale=10)
print("QR Code generated! Saved as my_code.png")