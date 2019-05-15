from hashlib import sha256


def encode_password(password):
    if isinstance(password, str):
        password = password.encode()

    m = sha256()
    m.update(password)
    return m.hexdigest()
