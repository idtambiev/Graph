import requests

id = 8148506
key = '7c5JnuLz8K2Vzd13d91H'
token ='a3d0cb49a3d0cb49a3d0cb49e5a3ac9d53aa3d0a3d0cb49c14fa02f77a30c9ba8e0cfd0'
userIds = 'mufasa_uuuu'
version = 5.131

url = 'https://api.vk.com/method/wall.get'
domain = 'vk-parser'

fields = 'universities, activities, music, movies, schools'

# response = requests.get('https://api.vk.com/method/wall.get',
#                         params={
#                         'access_token' = token,
#                         'v' = version,
#                         'domain' = domain
#                         }
#                         )
response = requests.get('https://api.vk.com/method/users.get',
                          params={
                            'access_token': token,
                            'user_ids': userIds,
                            'v': version,
                            'fields': fields
                            })

data = response.json()
print(data)

