import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const building = await prisma.building.create({
      data: body
    });

    return NextResponse.json(building, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Elan yaradıla bilmədi' },
      { status: 500 }
    );
  }
}