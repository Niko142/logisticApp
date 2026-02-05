PEAK_HOURS = {7, 8, 9, 17, 18, 19}

def is_peak_hour(hour):
    """ Проверяем, является ли данное время 'час-пиком' """
    return 1 if hour in PEAK_HOURS else 0