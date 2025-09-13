try:
    import tiktoken
except ImportError:
    tiktoken = None

ENERGY_PER_TOKEN_KWH = 0.00017
CARBON_INTENSITY_G_PER_KWH = 475.0

class TokenCounter:
    def __init__(self, encoder_name="gpt2"):
        if tiktoken:
            self.encoder = tiktoken.get_encoding(encoder_name)
        else:
            self.encoder = None

    def count_tokens(self, text):
        if self.encoder:
            return len(self.encoder.encode(text))
        return int(len(text.split()) * 1.3)

    def tokens_to_kwh(self, tokens):
        return tokens * ENERGY_PER_TOKEN_KWH

    def kwh_to_gco2(self, kwh):
        return kwh * CARBON_INTENSITY_G_PER_KWH

token_counter = TokenCounter()
