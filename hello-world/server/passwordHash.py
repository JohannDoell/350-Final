import hashlib, binascii, os


def hashPassword(password):
    """
    hash a password before storing it in the database
    :param password: the string representation of the password
    :return: the hashed version of the password with salt
    """
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
                                  salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')


def verifyPassword(storedPass, providedPass):

    salt = storedPass[:64]
    stored_password = storedPass[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512',
                                  providedPass.encode('utf-8'),
                                  salt.encode('ascii'),
                                  100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    return pwdhash == stored_password


# hashing tests
if __name__ == "__main__":
    stored = hashPassword("password")
    print(stored)

    v = verifyPassword(stored, "password")
    if not v:
        print("Error in verifyPassword, expected True on correct password, got: " + str(v))

    v = verifyPassword(stored, "notPassword")
    if v:
        print("Error in verifyPassword, expected False on correct password, got: " + str(v))

