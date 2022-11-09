import secrets
import string

def generate_random_sting(n):
    result=''.join(secrets.choice(string.ascii_uppercase+string.digits) for i in range(n))

    return result