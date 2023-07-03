import { BadRequestException, ForbiddenException, HttpCode, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

let admin = {};
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private userRepo: typeof Users,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto, res: Response) {
    try {
      await this.userRepo.findOne({ where: { email: createUserDto.email, role: "USER" } })
    } catch (error) {
      console.log(error);
      throw new NotFoundException({
        msg: "User Not Fount"
      })
    }
    const user = await this.userRepo.findOne({ where: { email: createUserDto.email, role: "USER" } })
    if (user) {
      if (user.password === createUserDto.password) {
        const tokens = await this.getTokens(user)

        const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);

        await this.userRepo.update(
          { hashed_token: hashed_token },
          { where: { id: user.id }, returning: true },)

        res.cookie('refresh_token', tokens.refresh_token, {
          maxAge: 15 * 42 * 60 * 60 * 1000,
          httpOnly: true,
        });

        const response = {
          msg: `${user.role} login`,
          tokens,
          user: {
            id: `${user.id}`,
            role: `${user.role}`,
          }
        }
        return response;
      } else {
        throw new BadRequestException({
          value: `${createUserDto.password}`,
          msg: "Password error!"
        })
      }
    } else {
      const userNew = await this.userRepo.create({ ...createUserDto, role: "USER" })
      const tokens = await this.getTokens(userNew)

      const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);

      await this.userRepo.update(
        { hashed_token: hashed_token },
        { where: { id: userNew.id } })

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 15 * 42 * 60 * 60 * 1000,
        httpOnly: true,
      });
      const response = {
        status: HttpCode(200),
        msg: `${userNew.role} created!`,
        tokens,
        newUser: {
          id: `${userNew.id}`,
          role: `${userNew.role}`,
        }
      }
      return response;
    }
  }

  async login(createUserDto: CreateUserDto, res: Response) {
    try {
      await this.userRepo.findOne({ where: { email: createUserDto.email, role: "ADMIN" } })
    } catch (error) {
      console.log(error);
      throw new NotFoundException({
        msg: "Admin Not Fount"
      })
    }
    const user = await this.userRepo.findOne({ where: { email: createUserDto.email, role: "ADMIN" } })
    if (user) {
      if (user.password === createUserDto.password) {
        if (createUserDto.key == process.env.KEY) {
          const tokens = await this.getTokens(user)

          const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);

          await this.userRepo.update(
            { hashed_token: hashed_token },
            { where: { id: user.id }, returning: true },)

          res.cookie('refresh_token', tokens.refresh_token, {
            maxAge: 15 * 42 * 60 * 60 * 1000,
            httpOnly: true,
          });

          const response = {
            msg: `${user.role} login`,
            tokens,
            admin: {
              id: `${user.id}`,
              role: `${user.role}`,
            }
          }
          return response;
        }
        else {
          throw new BadRequestException({
            value: `${createUserDto.password}`,
            msg: "Secret key error!"
          })
        }
      } else {
        throw new BadRequestException({
          value: `${createUserDto.password}`,
          msg: "Password error!"
        })
      }
    } else {
      if (createUserDto.key == process.env.KEY) {
        const newAdmin = await this.userRepo.create({ ...createUserDto, role: "ADMIN" });
        const tokens = await this.getTokens(newAdmin)

        const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);

        await this.userRepo.update(
          { hashed_token: hashed_token },
          { where: { id: newAdmin.id }, returning: true },)

        res.cookie('refresh_token', tokens.refresh_token, {
          maxAge: 15 * 42 * 60 * 60 * 1000,
          httpOnly: true,
        });

        const response = {
          status: HttpCode(200),
          msg: `${newAdmin.role} created!`,
          tokens,
          admin: {
            id: `${newAdmin.id}`,
            role: `${newAdmin.role}`,
          }
        }
        return response;
      } else {
        const response = {
          status: HttpCode(400),
          msg: "You are not allowed!",
        }
        return response;
      }
    }
  }

  async logout(refreshToken: string, res: Response) {
    const user = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    })
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const updatedUser = await this.userRepo.update(
      { hashed_token: null },
      { where: { id: user.id }, returning: true },
    )
    res.clearCookie('refreshToken');
    const response = {
      msg: `${user.role} sign out successfully`,
    }
    return response;

  }

  async findAll(query: string) {
    return await this.userRepo.findAll({ include: { all: true } });

    // console.log(query);
    // let totalPage = 0;
    // let a = 9;
    // let list = []
    // let lists = []
    // let page = { query }
    // let response: any;
    // const staff = await this.userRepo.findAll({ include: { all: true } });
    // for (let i = 0; i < staff.length; i++) {
    //   if (i <= a) {
    //     list.push(staff[i])
    //   }
    //   if (i == a) {
    //     lists.push(list)
    //     a += list.length
    //     list = []
    //   }
    //   if (i == staff.length - 1 && list[0]) {
    //     lists.push(list)
    //     a += list.length
    //     list = []
    //   }
    // }


    // for (let i in page) {
    //   for (let j in page[i]) {
    //     let idx = Number(page[i][j]);
    //     response = {
    //       records: lists[idx - 1],
    //       pagination: {
    //         currentPage: query,
    //         totalCount: staff.length,
    //         totalPage: lists.length
    //       }
    //     }
    //   }
    // }
    // return response;
  }

  async findOne(id: number): Promise<Users> {
    return await this.userRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.update(updateUserDto, {
      where: { id },
    })

    const response = {
      msg: "Update successfuly!"
    }
    return response
  }

  async remove(id: number) {
    const user = await this.userRepo.destroy({ where: { id } });
    const response = {
      msg: "Delete successfuly!"
    }

    return response;
  }

  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (user_id != decodedToken['id']) {
      throw new BadRequestException('User not found!');
    }
    const user = await this.userRepo.findOne({ where: { id: user_id } });
    if (!user || !user.hashed_token) {
      throw new BadRequestException('User not found!');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(user)

    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.userRepo.update(
      { hashed_token: hashed_token },
      { where: { id: user.id }, returning: true },)

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 42 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User logged in',
      user: updatedUser[1][0],
      tokens,
    }
    return response;
  }


  async getTokens(user: Users) {
    const jwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      })
    ])
    return {
      access_tokken: accessToken,
      refresh_token: refreshToken,
    };
  }
}
